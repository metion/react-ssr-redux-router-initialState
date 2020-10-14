import React from "react";
import "./NewsList.css";

export default function NewsList({ news }) {
    return (
        <div className="newslist">
            <div className="header">
                <strong>Wizard News</strong>
            </div>
            {news &&
            news.map(post =>
                <div key={post.id}>
                    <p>
                        {post.id} ⬆ {post.name}
                    </p>
                </div>
            )}
        </div>
    );
}
