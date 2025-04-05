import React from 'react';

export const TagSpan = ({ text }: { text: string }) => {
    return (
        <span className="tag-span">
            {text}
        </span>
    );
}