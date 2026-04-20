import Papa from "papaparse";

export interface Sermon {
  id: string;
  date: string;
  title: string;
  speaker: string;
  description: string;
  youtube_link: string;
}

const MOCK_CSV_URL = "https://docs.google.com/spreadsheets/d/mock_id/pub?output=csv";

const FALLBACK_CSV_DATA = `id,date,title,speaker,description,youtube_link
4,2023-10-22,Walking in Love,Sis. Sarah Lee,A call to love one another.,https://youtube.com/watch?v=abc
1,2023-10-01,Faith that Moves Mountains,Rev. John Doe,An inspiring message about faith.,https://youtube.com/watch?v=123
2,2023-10-08,Grace Undeserved,Pastor Jane Smith,Understanding the grace of God.,https://youtube.com/watch?v=456
3,2023-10-15,The Power of Prayer,Bro. Michael Brown,How to pray effectively.,https://youtube.com/watch?v=789
`;

export async function getSermons(): Promise<Sermon[]> {
  let csvText = FALLBACK_CSV_DATA;

  try {
    const response = await fetch(MOCK_CSV_URL, {
      next: { revalidate: 3600 },
    });
    if (response.ok) {
      csvText = await response.text();
    }
  } catch (error) {
    console.warn("Failed to fetch sermons CSV, using fallback data.");
  }

  return new Promise((resolve, reject) => {
    Papa.parse<Sermon>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Sort by date (newest first)
        const sorted = results.data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        resolve(sorted);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}
