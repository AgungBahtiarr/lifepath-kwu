import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LifePathCalculatorComponent() {
  const [birthdate, setBirthdate] = useState("");
  const [lifePath, setLifePath] = useState<number | null>(null);

  const calculateLifePath = (date: string) => {
    const dateNumbers = date.split("-").join("").split("").map(Number);
    let sum = dateNumbers.reduce((a, b) => a + b, 0);

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum
        .toString()
        .split("")
        .map(Number)
        .reduce((a, b) => a + b, 0);
    }

    return sum;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedLifePath = calculateLifePath(birthdate);
    setLifePath(calculatedLifePath);
  };

  const getLifePathDescription = (number: number) => {
    const descriptions: { [key: number]: string } = {
      1: "Mandiri, pemimpin, ambisius",
      2: "Kooperatif, diplomatis, peka",
      3: "Kreatif, ekspresif, optimis",
      4: "Praktis, terorganisir, pekerja keras",
      5: "Petualang, serbaguna, pencinta kebebasan",
      6: "Pengasuh, bertanggung jawab, penuh kasih",
      7: "Analitis, introspektif, spiritual",
      8: "Ambisius, berorientasi bisnis, kuat",
      9: "Penuh kasih, humanis, tidak mementingkan diri sendiri",
      11: "Intuitif, inspirasional, visioner",
      22: "Pembangun utama, visioner praktis, idealis",
      33: "Guru utama, altruistik, penuh kasih sayang",
    };
    return descriptions[number] || "Tidak diketahui";
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Life Path Calculator</CardTitle>
        <CardDescription>Masukkan tanggal lahir Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Tanggal Lahir</Label>
            <Input
              id="birthdate"
              type="date"
              required
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <Button type="submit">Hitung</Button>
        </form>

        {lifePath !== null && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Nomor Life Path Anda: {lifePath}
            </h3>
            <p className="text-muted-foreground">
              {getLifePathDescription(lifePath)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
