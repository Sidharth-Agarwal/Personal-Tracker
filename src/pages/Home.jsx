import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { CheckSquare, DollarSign, Activity, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
            Track Your Life,
            <span className="text-accent"> Simply</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Manage your tasks, finances, and fitness all in one beautiful, minimalist app
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button variant="primary" onClick={() => navigate('/signup')} className="w-full sm:w-auto">
              Get Started <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" onClick={() => navigate('/login')} className="w-full sm:w-auto">
              Sign In
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-20">
          <div className="bg-card-bg border border-border rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="text-accent" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3">Task Management</h3>
            <p className="text-sm sm:text-base text-text-secondary">
              Organize your daily tasks with priorities, categories, and due dates
            </p>
          </div>

          <div className="bg-card-bg border border-border rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-all opacity-50">
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-accent" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3">
              Money Tracking
              <span className="ml-2 text-xs bg-bg-tertiary px-2 py-1 rounded">Soon</span>
            </h3>
            <p className="text-sm sm:text-base text-text-secondary">
              Track income, expenses, and budgets to stay financially healthy
            </p>
          </div>

          <div className="bg-card-bg border border-border rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-all opacity-50 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Activity className="text-accent" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3">
              Fitness Tracker
              <span className="ml-2 text-xs bg-bg-tertiary px-2 py-1 rounded">Soon</span>
            </h3>
            <p className="text-sm sm:text-base text-text-secondary">
              Log steps, exercises, and build healthy habits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
