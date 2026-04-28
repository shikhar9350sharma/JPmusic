import { useState } from 'react';
import {
  Music2,
  Check,
  X,
  Crown,
  Zap,
  Headphones,
  Download,
  Smartphone,
  SkipForward,
  Volume2,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Listen with ads. Basic quality.',
    icon: Headphones,
    color: 'gray',
    features: [
      { text: 'Ad-supported streaming', included: true },
      { text: 'Standard audio quality', included: true },
      { text: 'Shuffle play only', included: true },
      { text: '6 skips per hour', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'No ads', included: false },
      { text: 'High quality audio', included: false },
      { text: 'Offline downloads', included: false },
      { text: 'Unlimited skips', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    period: 'month',
    description: 'Ad-free music. High quality. Downloads.',
    icon: Crown,
    color: 'emerald',
    popular: true,
    features: [
      { text: 'Ad-free streaming', included: true },
      { text: 'High quality audio (320kbps)', included: true },
      { text: 'Play any song, anytime', included: true },
      { text: 'Unlimited skips', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Offline downloads (10GB)', included: true },
      { text: 'Lyrics display', included: true },
      { text: 'Crossfade & gapless', included: true },
      { text: 'Early access to features', included: false },
    ]
  },
  {
    id: 'family',
    name: 'Family',
    price: 149,
    period: 'month',
    description: 'Premium for up to 6 members.',
    icon: Zap,
    color: 'purple',
    features: [
      { text: 'Everything in Premium', included: true },
      { text: '6 individual accounts', included: true },
      { text: 'Family mix playlist', included: true },
      { text: 'Parental controls', included: true },
      { text: 'Shared playlist management', included: true },
      { text: 'High quality audio (320kbps)', included: true },
      { text: 'Offline downloads (50GB)', included: true },
      { text: 'Priority support', included: true },
      { text: 'Exclusive family events', included: true },
    ]
  }
];

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, you can cancel your subscription at any time. Your premium access continues until the end of your billing period.'
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept UPI, credit/debit cards, net banking, and popular wallets like Paytm, PhonePe, and Google Pay.'
  },
  {
    q: 'Is there a student discount?',
    a: 'Yes! Students get 50% off Premium with valid student ID verification. Only ₹49/month.'
  },
  {
    q: 'How does Family plan work?',
    a: 'One person pays and invites up to 5 family members. Each gets their own private account with Premium features.'
  }
];

const Upgrade = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const getPrice = (plan) => {
    if (billingCycle === 'yearly' && plan.price > 0) {
      return Math.floor(plan.price * 10);
    }
    return plan.price;
  };

  const getPeriod = (plan) => {
    if (plan.price === 0) return 'forever';
    if (billingCycle === 'yearly') return 'year';
    return plan.period;
  };

  return (
    <div className="min-h-screen bg-black pb-32">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Upgrade Your Experience
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Music Without <span className="text-emerald-500">Limits</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Unlock ad-free listening, high-quality audio, offline downloads, and more. 
            Choose the plan that fits your vibe.
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12 px-4">
        <div className="inline-flex items-center gap-1 bg-[#1b1b1b] rounded-xl p-1 border border-gray-800">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-emerald-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-emerald-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              billingCycle === 'yearly' ? 'bg-black/20' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isPopular = plan.popular;
          const price = getPrice(plan);
          const period = getPeriod(plan);

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 md:p-8 flex flex-col transition-all hover:scale-[1.02] ${
                isPopular
                  ? 'border-emerald-500/50 bg-gradient-to-b from-emerald-500/5 to-transparent shadow-lg shadow-emerald-500/10'
                  : 'border-gray-800 bg-[#121212] hover:border-gray-700'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                  plan.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {price > 0 && <span className="text-2xl text-gray-400">₹</span>}
                  <span className="text-5xl font-bold text-white">
                    {price === 0 ? 'Free' : price}
                  </span>
                  {price > 0 && (
                    <span className="text-gray-400">/{period}</span>
                  )}
                </div>
                {billingCycle === 'yearly' && price > 0 && (
                  <p className="text-xs text-emerald-400 mt-1">
                    ₹{Math.floor(price / 12)}/month billed annually
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all mb-6 ${
                  isPopular
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                    : plan.price === 0
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-white hover:bg-gray-100 text-black'
                }`}
              >
                {plan.price === 0 ? 'Current Plan' : 'Upgrade Now'}
                {plan.price > 0 && <ArrowRight className="w-4 h-4 inline ml-2" />}
              </button>

              {/* Features */}
              <div className="space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        isPopular ? 'text-emerald-400' : 'text-gray-400'
                      }`} />
                    ) : (
                      <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-600" />
                    )}
                    <span className={`text-sm ${
                      feature.included ? 'text-gray-300' : 'text-gray-600 line-through'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Highlight */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Why Go <span className="text-emerald-500">Premium</span>?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Volume2, title: 'Hi-Fi Audio', desc: '320kbps quality' },
            { icon: Download, title: 'Offline Mode', desc: 'Download & listen' },
            { icon: SkipForward, title: 'Unlimited Skips', desc: 'No restrictions' },
            { icon: Smartphone, title: 'All Devices', desc: 'Phone, web & more' },
          ].map((item) => (
            <div key={item.title} className="text-center space-y-3 p-4">
              <div className="w-14 h-14 mx-auto bg-[#1b1b1b] border border-gray-800 rounded-2xl flex items-center justify-center">
                <item.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Frequently Asked <span className="text-emerald-500">Questions</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1b1b1b] transition-colors"
              >
                <span className="text-white font-medium text-sm md:text-base">{faq.q}</span>
                <span className={`text-emerald-400 transition-transform ${
                  expandedFaq === idx ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              {expandedFaq === idx && (
                <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Music2 className="w-4 h-4" />
            <span>50M+ Songs</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;