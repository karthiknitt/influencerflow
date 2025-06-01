import { NextResponse } from "next/server";

interface YouTubeSearchItem {
  id: {
    channelId: string;
  };
  snippet: {
    channelTitle: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

interface YouTubeChannelItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
  statistics: {
    subscriberCount: string;
  };
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const countryCode = searchParams.get("countryCode");
  const maxResults = searchParams.get("maxResults");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  if (!youtubeApiKey) {
    return NextResponse.json({ error: "YouTube API key not configured" }, { status: 500 });
  }

  try {
    const resultsLimit = maxResults ? parseInt(maxResults) : 20; // Default to 20 if not provided
    const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=channel&key=${youtubeApiKey}&maxResults=${resultsLimit}${countryCode ? `&regionCode=${countryCode}` : ""}`;
    
    const searchResponse = await fetch(youtubeSearchUrl);
    const searchData = await searchResponse.json();

    if (!searchResponse.ok) {
      console.error("YouTube Search API error:", searchData);
      return NextResponse.json({ error: searchData.error?.message || "Failed to fetch YouTube search data" }, { status: searchResponse.status });
    }

    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json([]);
    }

    const channelIds = searchData.items.map((item: YouTubeSearchItem) => item.id.channelId).join(",");
    const youtubeChannelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${youtubeApiKey}`;

    const channelsResponse = await fetch(youtubeChannelsUrl);
    const channelsData = await channelsResponse.json();

    if (!channelsResponse.ok) {
      console.error("YouTube Channels API error:", channelsData);
      return NextResponse.json({ error: channelsData.error?.message || "Failed to fetch YouTube channel data" }, { status: channelsResponse.status });
    }

    const channelsWithStats = channelsData.items.map((item: YouTubeChannelItem) => {
      return {
        id: item.id,
        name: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
        link: `https://www.youtube.com/channel/${item.id}`,
        subscriberCount: parseInt(item.statistics.subscriberCount || "0"),
      };
    });

    // Sort channels by subscriber count in descending order
    channelsWithStats.sort((a: { subscriberCount: number }, b: { subscriberCount: number }) => b.subscriberCount - a.subscriberCount);

    return NextResponse.json(channelsWithStats);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}