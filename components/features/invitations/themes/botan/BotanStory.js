import Image from "next/image";
import { formatInvitationDate } from "@/lib/invitations/date";

export default function BotanStory({ invitation }) {
  const storyItems = Array.isArray(invitation?.stories) ? invitation.stories : [];

  if (!storyItems.length) return null;

  const withImage = (story) => !!story.imageUrl;

  return (
    <div id="our-story" name="our-story-section">
      <div className="content">
        <div className="view-content">
          <div className="title">
            <p>Kisah Kami</p>
          </div>

          <div id="our-stories" className="hidden md:flex our-stories pb-5">
            {storyItems.map((story, index) => (
              <div key={`story-${index}`} className="story-item">
                {index !== 0 && (
                  <div className="bridge">
                    <img src="/themes/botan/our-story/story-bridge.png" alt="story-bridge" />
                  </div>
                )}
                <div className="story-wrapper">
                  {withImage(story) ? (
                    <div className="story-with-image">
                      <div className="story-left">
                        <div className="story-image">
                          <img src={story.imageUrl} alt="story-image" />
                        </div>
                      </div>
                      <div className="story-right">
                        <div className="story-title">
                          <p>{story.title}</p>
                        </div>
                        <div className="story-desc">
                          <p>{story.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="story-text">
                      {story.title && story.description ? (
                        <div className="story-with-title">
                          <div className="story-title">
                            <p>{story.title}</p>
                          </div>
                          <div className="story-desc">
                            <p>{story.description}</p>
                          </div>
                        </div>
                      ) : (
                        <p>{story.description || story.title}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div id="our-stories-mobile" className="md:hidden our-stories" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
            {storyItems.map((story, index) => (
              <div key={`story-${index}`} className="mobile-story-item" style={{ scrollSnapAlign: 'center', flexShrink: 0 }}>
                {index !== 0 ? (
                  <div className="bridge">
                    <img src="/themes/botan/our-story/mobile-story-bridge-left.png" alt="story-bridge" />
                  </div>
                ) : (
                  <div className="bridge-dummy"></div>
                )}
                <div className="story-wrapper">
                  {withImage(story) ? (
                    <div className="story-with-image">
                      <div className="story-image">
                        <img src={story.imageUrl} alt="story-image" />
                      </div>
                      <div className="story-content">
                        <div className="story-title">
                          <p>{story.title}</p>
                        </div>
                        <div className="story-desc">
                          <p>{story.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="story-text">
                      {story.title && story.description ? (
                        <div className="story-with-title">
                          <div className="story-title">
                            <p>{story.title}</p>
                          </div>
                          <div className="story-desc">
                            <p>{story.description}</p>
                          </div>
                        </div>
                      ) : (
                        <p>{story.description || story.title}</p>
                      )}
                    </div>
                  )}
                </div>
                {index + 1 !== storyItems.length ? (
                  <div className="bridge">
                    <img src="/themes/botan/our-story/mobile-story-bridge-right.png" alt="story-bridge" />
                  </div>
                ) : (
                  <div className="bridge-dummy"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden decorations">
        <div className="top-left">
          <img src="/themes/botan/our-story/mobile-decor-top-left.png" alt="decor-top-left" />
        </div>
      </div>
    </div>
  );
}

