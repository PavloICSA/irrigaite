import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const { t, ready } = useTranslation('pages');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, subject, message } = formData;
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:pavel.likhovid@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
  };

  // Debug: Check if translations are ready and working
  console.log('Translation ready:', ready);
  console.log('Contact title translation:', t('contact.title'));
  console.log('Contact subtitle translation:', t('contact.subtitle'));

  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading translations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              {t('contact.info.title')}
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('contact.info.email.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {t('contact.info.email.description')}
                  </p>
                  <a 
                    href="mailto:pavel.likhovid@gmail.com"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium mt-2 inline-block"
                  >
                    pavel.likhovid@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('contact.info.hours.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {t('contact.info.hours.weekdays')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('contact.info.hours.weekend')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('contact.info.location.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {t('contact.info.location.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              {t('contact.developer.title')}
            </h2>
            
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-green-600 dark:bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">PL</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {t('contact.developer.name')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {t('contact.developer.role')}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-justified-container">
                {t('contact.developer.bio')}
              </p>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  {t('contact.developer.expertise.title')}
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('contact.developer.expertise.irrigation')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('contact.developer.expertise.precision')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('contact.developer.expertise.climate')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('contact.developer.expertise.software')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            {t('contact.form.title')}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                placeholder={t('contact.form.namePlaceholder')}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                placeholder={t('contact.form.emailPlaceholder')}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('contact.form.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                placeholder={t('contact.form.subjectPlaceholder')}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-vertical"
                placeholder={t('contact.form.messagePlaceholder')}
                required
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 dark:bg-green-500 text-white py-3 px-6 hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium"
              >
                {t('contact.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}