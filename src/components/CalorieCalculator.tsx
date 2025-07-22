import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Zap, Heart, Target } from 'lucide-react';

interface CalorieCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
}

const CalorieCalculator = ({ isOpen, onClose }: CalorieCalculatorProps) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: ''
  });
  const [results, setResults] = useState<{ bmr: number; dailyCalories: number } | null>(null);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const calculateCalories = () => {
    const age = parseInt(userData.age);
    const height = parseInt(userData.height);
    const weight = parseInt(userData.weight);
    
    // Mifflin-St Jeor Equation
    let bmr: number;
    if (userData.gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const multiplier = activityMultipliers[userData.activityLevel as keyof typeof activityMultipliers];
    const dailyCalories = Math.round(bmr * multiplier);

    setResults({ bmr: Math.round(bmr), dailyCalories });
    setStep(6);
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      calculateCalories();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setUserData({
      age: '',
      gender: '',
      height: '',
      weight: '',
      activityLevel: ''
    });
    setResults(null);
  };

  const handleClose = () => {
    resetCalculator();
    onClose();
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return userData.age && parseInt(userData.age) > 0;
      case 2: return userData.gender;
      case 3: return userData.height && parseInt(userData.height) > 0;
      case 4: return userData.weight && parseInt(userData.weight) > 0;
      case 5: return userData.activityLevel;
      default: return false;
    }
  };

  const getGreeting = () => {
    const greetings = [
      "Hi there! Let's figure out your daily calories 😊",
      "Great! Now tell me a bit about yourself...",
      "Perfect! Let's continue...",
      "Almost there! Just a few more questions...",
      "Last question, I promise! 🌟",
      "Awesome! Here are your results! 🎉"
    ];
    return greetings[step - 1];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-playfair text-foreground">
            Calorie Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {Math.min(step, 5)} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Greeting */}
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-orange-50 rounded-lg border border-green-200">
            <p className="text-lg font-medium text-foreground">{getGreeting()}</p>
          </div>

          {/* Step Content */}
          <div className="space-y-4">
            {step === 1 && (
              <div className="space-y-3">
                <Label htmlFor="age" className="text-lg font-medium">What's your age?</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age (e.g., 25)"
                  value={userData.age}
                  onChange={(e) => setUserData({...userData, age: e.target.value})}
                  className="text-lg h-12"
                  min="1"
                  max="120"
                />
                <p className="text-sm text-muted-foreground">This helps us calculate your metabolism accurately</p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <Label className="text-lg font-medium">What's your gender?</Label>
                <Select value={userData.gender} onValueChange={(value) => setUserData({...userData, gender: value})}>
                  <SelectTrigger className="text-lg h-12">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Men and women have different metabolic rates</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <Label htmlFor="height" className="text-lg font-medium">What's your height?</Label>
                <div className="relative">
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter height (e.g., 170)"
                    value={userData.height}
                    onChange={(e) => setUserData({...userData, height: e.target.value})}
                    className="text-lg h-12 pr-12"
                    min="100"
                    max="250"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">cm</span>
                </div>
                <p className="text-sm text-muted-foreground">Your height affects how many calories you burn</p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <Label htmlFor="weight" className="text-lg font-medium">What's your current weight?</Label>
                <div className="relative">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight (e.g., 70)"
                    value={userData.weight}
                    onChange={(e) => setUserData({...userData, weight: e.target.value})}
                    className="text-lg h-12 pr-12"
                    min="30"
                    max="300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">kg</span>
                </div>
                <p className="text-sm text-muted-foreground">This is the most important factor for calorie calculation</p>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-3">
                <Label className="text-lg font-medium">How active are you?</Label>
                <Select value={userData.activityLevel} onValueChange={(value) => setUserData({...userData, activityLevel: value})}>
                  <SelectTrigger className="text-lg h-12">
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (desk job, no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (intense exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">This multiplier accounts for your daily energy expenditure</p>
              </div>
            )}

            {step === 6 && results && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-orange-500 text-white text-2xl font-bold animate-pulse">
                    <Zap className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Your Daily Calorie Needs</h3>
                    <div className="text-4xl font-bold text-primary">{results.dailyCalories} kcal/day</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">BMR</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{results.bmr}</div>
                      <div className="text-sm text-green-600">calories at rest</div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-orange-800">Active</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">{results.dailyCalories}</div>
                      <div className="text-sm text-orange-600">total daily need</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-orange-50 rounded-lg border border-green-200">
                    <p className="text-foreground">
                      Based on your info, you need <strong>~{results.dailyCalories} kcal/day</strong> to maintain your weight. 
                      Want tips on how to build a salad that fits? 🥗
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button onClick={resetCalculator} variant="outline" className="flex-1">
                    Calculate Again
                  </Button>
                  <Button onClick={handleClose} className="flex-1 btn-primary">
                    Build My Salad
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {step < 6 && (
            <div className="flex justify-between pt-4">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={step === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center space-x-2 btn-primary"
              >
                <span>{step === 5 ? 'Calculate' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalorieCalculator;