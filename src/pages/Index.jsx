import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import StoryList from './components/StoryList';
import SkeletonPlaceholder from './components/SkeletonPlaceholder';

const fetchStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchStories
  });

  const filteredStories = data?.hits.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hacker News Top Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      {isLoading ? (
        <SkeletonPlaceholder />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <StoryList stories={filteredStories} />
      )}
    </div>
  );
};

export default Index;