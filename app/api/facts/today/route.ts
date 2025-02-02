import { NextResponse } from "next/server";

interface DayFact {
  fact: string;
  year?: number;
}

export async function GET() {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Using Numbers API - a free API for interesting number facts
    const response = await fetch(`http://numbersapi.com/${month}/${day}/date`);

    if (!response.ok) {
      throw new Error("Failed to fetch fact");
    }

    const factText = await response.text();

    let factContent = factText;

    // Check if the text contains the expected format with ":"
    if (factText.includes(":")) {
      factContent = factText.split(":")[1];
    }

    const fact: DayFact = {
      fact: factContent.replace(/\sin\s\d{4}/, "").trim(),
    };

    return NextResponse.json(fact);
  } catch (error) {
    console.error("Error fetching today fact:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's fact" },
      { status: 500 }
    );
  }
}
