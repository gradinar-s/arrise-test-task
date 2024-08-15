import { FC } from "react";
import "./styles.scss";

const VERTICAL_GROUP_ELEMENT = "4";
const VERTICAL_GROUP_SIZE = 4;

const extendVerticalLines = (
  matrix: string[][],
  target = VERTICAL_GROUP_ELEMENT,
  requiredLength = VERTICAL_GROUP_SIZE
) => {
  const colCount = matrix[0].length;
  let additionalLinesFirst = 0;

  for (let col = 0; col < colCount; col++) {
    let count = 0;
    let firstRow = -1;

    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row][col] === target) {
        if (count === 0) firstRow = row;
        count++;
      } else if (count > 0) {
        break;
      }
    }

    if (count > 0 && count < requiredLength) {
      const rowsToAdd = requiredLength - count;

      if (firstRow > 0) {
        for (let i = 0; i < rowsToAdd; i++) {
          const newRow = Array(colCount).fill(null);
          newRow[col] = target;
          matrix.push(newRow);
        }
      } else {
        for (let i = 0; i < rowsToAdd; i++) {
          const newRow = Array(colCount).fill(null);
          newRow[col] = target;
          additionalLinesFirst++;
          matrix.unshift(newRow);
        }
      }
    }
  }

  return { matrix, additionalLinesFirst };
};

interface Props {
  items: string;
}

export const Area: FC<Props> = ({ items }) => {
  const rows = [];
  const numbers = items.split(",");
  for (let i = 0; i < numbers.length; i += 5) {
    rows.push(numbers.slice(i, i + 5));
  }

  const { matrix: gridRows, additionalLinesFirst } = extendVerticalLines(rows);
  const targetElementIndexes: number[] = [];

  return (
    <div
      className="area"
      style={{ marginTop: `-${additionalLinesFirst * 50}px` }}
    >
      {gridRows.map((row, rowIndex) => {
        const currentRow = rowIndex + 1;

        return row.map((cell, cellIndex) => {
          const currentCell = cellIndex + 1;
          const isElementMounted = targetElementIndexes.includes(currentCell);

          if (cell === VERTICAL_GROUP_ELEMENT && !isElementMounted) {
            targetElementIndexes.push(currentCell);

            return (
              <div
                key={cellIndex}
                className="area-cell area-cell_glued"
                style={{
                  backgroundImage: `url(/${cell}.png)`,
                  gridColumn: currentCell,
                  gridRowStart: currentRow,
                  gridRowEnd: currentRow + VERTICAL_GROUP_SIZE,
                }}
              />
            );
          } else if (cell !== VERTICAL_GROUP_ELEMENT) {
            return (
              <div
                key={cellIndex}
                className="area-cell"
                style={{
                  backgroundImage: `url(/${cell}.png)`,
                  gridColumn: currentCell,
                  gridRow: currentRow,
                }}
              />
            );
          }
        });
      })}
    </div>
  );
};
