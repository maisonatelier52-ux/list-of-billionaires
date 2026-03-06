export default function ArticleCard({ title, href, image, description }) {
  return (
    <a
      href={href}
      className="group block overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-300">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm">
            {description}
          </p>
        )}
      </div>
    </a>
  );
}
