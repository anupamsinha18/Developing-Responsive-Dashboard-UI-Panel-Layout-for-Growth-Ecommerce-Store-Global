import React from 'react';

/**
 * ChannelBreakdown Component
 * Displays order distribution across Website, Mobile App, and Marketplace channels.
 * Uses semantic progress elements and organized CSS without inline styles.
 */
export default function ChannelBreakdown({ transactions = [] }) {
  const completed = transactions.filter((t) => t.status === 'Completed');

  // Compute completed channel distribution
  const channelData = React.useMemo(() => {
    const total = completed.length || 1;
    const channels = [
      { id: 'website', name: 'Website' },
      { id: 'mobile', name: 'Mobile App' },
      { id: 'marketplace', name: 'Marketplace' },
    ];

    return channels.map((ch) => {
      const count = completed.filter((t) => {
        if (ch.id === 'website') return t.channel === 'Website';
        if (ch.id === 'mobile') return t.channel === 'Mobile App';
        if (ch.id === 'marketplace') return t.channel === 'Marketplace';
        return false;
      }).length;
      const percentage = Math.round((count / total) * 100);
      return {
        ...ch,
        count,
        percentage,
      };
    });
  }, [completed]);

  return (
    <article className="analyticsCard channelCard" aria-label="Orders by channel breakdown">
      <div className="analyticsCardHeader">
        <h2 className="analyticsCardTitle">Orders by channel</h2>
      </div>

      <div className="channelList">
        {channelData.map((channel) => (
          <div key={channel.id} className="channelRow">
            <div className="channelMeta">
              <span className="channelName">{channel.name}</span>
              <span className="channelStats">
                {channel.count} orders ({channel.percentage}%)
              </span>
            </div>

            <progress
              className={`channelProgress channelProgress--${channel.id}`}
              value={channel.percentage}
              max="100"
              aria-label={`${channel.name} share: ${channel.percentage}%`}
            >
              {channel.percentage}%
            </progress>
          </div>
        ))}
      </div>
    </article>
  );
}
