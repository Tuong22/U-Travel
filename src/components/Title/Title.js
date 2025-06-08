export const SectionTitle = ({
  title,
  subtitle,
  className = "",
  showUnderline = true,
  underlineWidth = "w-16",
  textSize = "text-2xl sm:text-3xl",
}) => {
  const renderTextWithLineBreaks = (text) => {
    if (!text) return null

    return text.split("\n").map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className={`mb-8 ${className}`}>
      <h2 className={`${textSize} font-bold text-gray-700 leading-tight`}>
        {renderTextWithLineBreaks(title)}
        {subtitle && (
          <>
            <br />
            {renderTextWithLineBreaks(subtitle)}
          </>
        )}
      </h2>
      {showUnderline && <div className={`${underlineWidth} h-1 bg-gray-600 mt-4`}></div>}
    </div>
  )
}
