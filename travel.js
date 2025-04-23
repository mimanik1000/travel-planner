import { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Input } from "@/components/ui/input"; import { Button } from "@/components/ui/button"; import { Label } from "@/components/ui/label";

export default function TravelPlanner() { const [form, setForm] = useState({ destination: "", startDate: "", duration: "", travelers: "", budget: "", tripType: "" });

const [suggestion, setSuggestion] = useState(null);

const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleSubmit = () => { const durationDays = parseInt(form.duration) || 1; const travelers = parseInt(form.travelers) || 1; const budget = parseInt(form.budget) || 0;

// Basic cost logic
let perDayCost = 8500;
let hotelGrade = "৩-স্টার হোটেল";
let flightType = "লোকাল ফ্লাইট";

if (budget / (durationDays * travelers) > 12000) {
  perDayCost = 12000;
  hotelGrade = "৪-স্টার হোটেল";
  flightType = "লোকাল/রিটার্ন ফ্লাইট (এয়ার কন্ডিশন্ড)";
} else if (budget / (durationDays * travelers) < 7000) {
  perDayCost = 7000;
  hotelGrade = "২-স্টার বা গেস্ট হাউজ";
  flightType = "বাস/লোকাল ট্রান্সপোর্ট";
}

const totalCost = travelers * perDayCost * durationDays;
const withinBudget = totalCost <= budget;

const message = withinBudget
  ? `আপনার বাজেটের মধ্যে সুন্দর একটি প্যাকেজ সাজানো সম্ভব। আনুমানিক মোট খরচ ${totalCost} টাকা।`
  : `দুঃখিত, ${form.budget} টাকায় এই প্যাকেজ তৈরি সম্ভব না। আনুমানিক খরচ ${totalCost} টাকা।`

const plan = {
  flight: `${form.destination} যাওয়ার জন্য ${flightType}`,
  hotel: `${form.duration} রাত ${form.destination}-এ ${hotelGrade}`,
  food: `প্রতিদিন ৩ বেলা খাবার (প্রতি জন ৫০০ টাকা আনুমানিক)`,
  spots: `লোকাল দর্শনীয় স্থানসমূহ: বিচ, পাহাড়, মিউজিয়াম ইত্যাদি`
};

setSuggestion({ totalCost, withinBudget, message, plan });

};

return ( <div className="max-w-2xl mx-auto p-6 space-y-4"> <Card> <CardContent className="space-y-4 p-4"> <h2 className="text-xl font-bold">ট্রাভেল প্যাকেজ প্ল্যানার</h2>

<div>
        <Label>গন্তব্য</Label>
        <Input name="destination" value={form.destination} onChange={handleChange} placeholder="যেমনঃ কক্সবাজার" />
      </div>

      <div>
        <Label>যাত্রার তারিখ</Label>
        <Input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
      </div>

      <div>
        <Label>কতদিন থাকবেন?</Label>
        <Input name="duration" value={form.duration} onChange={handleChange} placeholder="যেমনঃ ৩ দিন" />
      </div>

      <div>
        <Label>ভ্রমণকারীর সংখ্যা</Label>
        <Input name="travelers" value={form.travelers} onChange={handleChange} placeholder="যেমনঃ ২ জন" />
      </div>

      <div>
        <Label>আপনার মোট বাজেট</Label>
        <Input name="budget" value={form.budget} onChange={handleChange} placeholder="যেমনঃ ৩০,০০০ টাকা" />
      </div>

      <div>
        <Label>ভ্রমণের ধরন</Label>
        <Input name="tripType" value={form.tripType} onChange={handleChange} placeholder="যেমনঃ হানিমুন / ফ্যামিলি" />
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        AI দিয়ে প্যাকেজ সাজান
      </Button>

      {suggestion && (
        <div className={`mt-4 p-4 rounded-lg space-y-2 ${suggestion.withinBudget ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="font-medium">{suggestion.message}</p>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>ফ্লাইট:</strong> {suggestion.plan.flight}</p>
            <p><strong>হোটেল:</strong> {suggestion.plan.hotel}</p>
            <p><strong>খাবার:</strong> {suggestion.plan.food}</p>
            <p><strong>দর্শনীয় স্থান:</strong> {suggestion.plan.spots}</p>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
</div>

); }


