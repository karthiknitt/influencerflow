"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface YouTubeCreator {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  link: string;
  subscriberCount: number;
}

export default function YouTubeSearchPage() {
  const [productService, setProductService] = useState("");
  const [country, setCountry] = useState("");
  const [numberOfResults, setNumberOfResults] = useState("10");
  const [results, setResults] = useState<YouTubeCreator[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!productService) {
      alert("Please enter a product or service to search for.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(
        `/api/youtube-search?query=${encodeURIComponent(
          productService
        )}&countryCode=${encodeURIComponent(country)}&maxResults=${encodeURIComponent(numberOfResults)}`
      );
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "An error occurred during search.");
        setResults([]);
        return;
      }

      setResults(data);
    } catch (error) {
      console.error("Failed to fetch YouTube search results:", error);
      alert("Failed to fetch search results. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const formatSubscriberCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">YouTube Creator Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productService" className="text-lg">Product or Service</Label>
                <Input
                  id="productService"
                  placeholder="e.g., 'gaming headsets', 'vegan recipes'"
                  value={productService}
                  onChange={(e) => setProductService(e.target.value)}
                  className="mt-1 p-3 text-base"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-lg">Country</Label>
                <Select onValueChange={setCountry} value={country}>
                  <SelectTrigger className="w-full mt-1 p-3 text-base">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="BR">Brazil</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numberOfResults" className="text-lg">Number of Results</Label>
                <Select onValueChange={setNumberOfResults} value={numberOfResults}>
                  <SelectTrigger className="w-full mt-1 p-3 text-base">
                    <SelectValue placeholder="Select number of results" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 51 }, (_, i) => i).map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num === 0 ? "0 (No results)" : num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full py-3 text-lg font-semibold" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search YouTube"
              )}
            </Button>
          </div>

          {loading && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6 text-center">Searching...</h3>
              <ul className="space-y-6">
                {Array.from({ length: parseInt(numberOfResults) || 10 }).map((_, index) => (
                  <li key={index}>
                    <Card className="flex flex-col sm:flex-row items-center p-6 shadow-lg rounded-xl">
                      <Skeleton className="w-24 h-24 sm:w-20 sm:h-20 rounded-full flex-shrink-0 mb-4 sm:mb-0 sm:mr-6" />
                      <div className="flex-grow text-center sm:text-left">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6 text-center">Search Results (Sorted by Subscribers)</h3>
              <ul className="space-y-6">
                {results.map((creator) => (
                  <li key={creator.id}>
                    <Card className="flex flex-col sm:flex-row items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                      <Avatar className="w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        <AvatarImage src={creator.thumbnail} alt={creator.name} />
                        <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow text-center sm:text-left">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {creator.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {creator.description || "No description available."}
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                          <Badge variant="secondary" className="px-3 py-1 text-sm">
                            Subscribers: {formatSubscriberCount(creator.subscriberCount)}
                          </Badge>
                          <a
                            href={creator.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:underline text-sm font-medium"
                          >
                            View Channel
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}