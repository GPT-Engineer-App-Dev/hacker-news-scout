import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ExternalLink } from "lucide-react";

const StoryList = ({ stories }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <Card key={story.objectID}>
          <CardHeader>
            <CardTitle className="text-lg">{story.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ArrowUpCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>{story.points} points</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(story.url, '_blank')}
              >
                Read More
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StoryList;