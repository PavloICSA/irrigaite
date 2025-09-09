#!/usr/bin/env node

/**
 * Translation validation script for development
 * Run with: node scripts/validateTranslations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Translation validation functions (Node.js version)
function flattenTranslationKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...flattenTranslationKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }
  
  return keys;
}

function findEmptyTranslations(obj, prefix = '') {
  const emptyKeys = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        emptyKeys.push(...findEmptyTranslations(obj[key], fullKey));
      } else if (!obj[key] || (typeof obj[key] === 'string' && obj[key].trim() === '')) {
        emptyKeys.push(fullKey);
      }
    }
  }
  
  return emptyKeys;
}

function compareTranslationKeys(baseKeys, compareKeys) {
  const missingKeys = baseKeys.filter(key => !compareKeys.includes(key));
  const extraKeys = compareKeys.filter(key => !baseKeys.includes(key));
  
  return { missingKeys, extraKeys };
}

function validateTranslationCompleteness(baseTranslations, targetTranslations) {
  const baseKeys = flattenTranslationKeys(baseTranslations);
  const targetKeys = flattenTranslationKeys(targetTranslations);
  const emptyValues = findEmptyTranslations(targetTranslations);
  
  const { missingKeys, extraKeys } = compareTranslationKeys(baseKeys, targetKeys);
  
  return {
    isValid: missingKeys.length === 0 && emptyValues.length === 0,
    missingKeys,
    extraKeys,
    emptyValues
  };
}

function loadTranslationFile(language, namespace) {
  const filePath = path.join(__dirname, '..', 'public', 'locales', language, `${namespace}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load ${language}/${namespace}.json:`, error.message);
    return null;
  }
}

function validateAllTranslations() {
  const namespaces = ['common', 'calculations', 'pages', 'legal', 'reference'];
  const languages = ['en', 'uk'];
  const report = {};
  
  console.log('🌐 Validating translations...\n');
  
  for (const namespace of namespaces) {
    report[namespace] = {};
    
    // Load English translations as base
    const enTranslations = loadTranslationFile('en', namespace);
    
    if (!enTranslations) {
      console.error(`❌ Failed to load base translations for ${namespace}`);
      continue;
    }
    
    for (const language of languages) {
      if (language === 'en') {
        // Validate English for empty values
        const emptyValues = findEmptyTranslations(enTranslations);
        report[namespace][language] = {
          isValid: emptyValues.length === 0,
          missingKeys: [],
          extraKeys: [],
          emptyValues
        };
      } else {
        // Validate other languages against English
        const translations = loadTranslationFile(language, namespace);
        
        if (translations) {
          report[namespace][language] = validateTranslationCompleteness(
            enTranslations,
            translations
          );
        } else {
          report[namespace][language] = {
            isValid: false,
            missingKeys: flattenTranslationKeys(enTranslations),
            extraKeys: [],
            emptyValues: []
          };
        }
      }
    }
  }
  
  return report;
}

function generateValidationReport(report) {
  let output = '=== Translation Validation Report ===\n\n';
  let totalIssues = 0;
  
  for (const [namespace, languages] of Object.entries(report)) {
    output += `Namespace: ${namespace}\n`;
    output += '─'.repeat(50) + '\n';
    
    for (const [language, result] of Object.entries(languages)) {
      const status = result.isValid ? '✅ Valid' : '❌ Issues Found';
      output += `  ${language.toUpperCase()}: ${status}\n`;
      
      if (!result.isValid) {
        totalIssues++;
      }
      
      if (result.missingKeys.length > 0) {
        output += `    Missing keys (${result.missingKeys.length}):\n`;
        result.missingKeys.slice(0, 5).forEach(key => {
          output += `      - ${key}\n`;
        });
        if (result.missingKeys.length > 5) {
          output += `      ... and ${result.missingKeys.length - 5} more\n`;
        }
      }
      
      if (result.extraKeys.length > 0) {
        output += `    Extra keys (${result.extraKeys.length}):\n`;
        result.extraKeys.slice(0, 3).forEach(key => {
          output += `      + ${key}\n`;
        });
        if (result.extraKeys.length > 3) {
          output += `      ... and ${result.extraKeys.length - 3} more\n`;
        }
      }
      
      if (result.emptyValues.length > 0) {
        output += `    Empty values (${result.emptyValues.length}):\n`;
        result.emptyValues.slice(0, 3).forEach(key => {
          output += `      ∅ ${key}\n`;
        });
        if (result.emptyValues.length > 3) {
          output += `      ... and ${result.emptyValues.length - 3} more\n`;
        }
      }
      
      output += '\n';
    }
    
    output += '\n';
  }
  
  // Summary
  output += '=== Summary ===\n';
  if (totalIssues === 0) {
    output += '✅ All translations are valid!\n';
  } else {
    output += `❌ Found issues in ${totalIssues} language/namespace combinations.\n`;
    output += 'Please review and fix the issues listed above.\n';
  }
  
  return output;
}

// Main execution
function main() {
  try {
    const report = validateAllTranslations();
    const formattedReport = generateValidationReport(report);
    
    console.log(formattedReport);
    
    // Exit with error code if there are issues
    const hasIssues = Object.values(report).some(namespace =>
      Object.values(namespace).some(result => !result.isValid)
    );
    
    process.exit(hasIssues ? 1 : 0);
  } catch (error) {
    console.error('❌ Failed to validate translations:', error);
    process.exit(1);
  }
}

// Run the script if called directly
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  main();
}

export {
  validateAllTranslations,
  generateValidationReport,
  flattenTranslationKeys,
  findEmptyTranslations,
  compareTranslationKeys,
  validateTranslationCompleteness
};