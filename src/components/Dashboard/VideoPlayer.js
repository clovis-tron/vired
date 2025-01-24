import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  // Extract the video ID from the URL
  const videoId = videoUrl.split('v=')[1];

  // Ensure videoId exists and format it into a YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-player">
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video Player"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
