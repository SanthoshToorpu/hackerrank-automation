// Example Java code snippet with inconsistent indentation
const javaCode = ""

// Function to format Java code with proper indentation
function formatJavaCode(javaCode) {
  // Split the code into lines
  let lines = javaCode.split("\n");

  lines = lines.map(line => line.trim());

  const firstLineSpaces = lines[0].match(/^\s*/)[0].length;

  lines = lines.map(line => {
    const leadingSpaces = line.match(/^\s*/)[0].length;
    const spacesToAdd = leadingSpaces - firstLineSpaces;
    return " ".repeat(4) + line.trim().slice(spacesToAdd);
  });

  return lines.join("\n");
}

const formattedJavaCode = formatJavaCode(javaCode);

console.log(formattedJavaCode);
