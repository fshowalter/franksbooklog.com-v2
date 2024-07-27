import type { AlltimeStats } from "src/api/alltimeStats";
import { BarGradient } from "src/components/BarGradient";
import { StatHeading } from "src/components/StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "src/components/StatsTable";

export function GradeDistribution({
  values,
}: {
  values: Pick<AlltimeStats["gradeDistribution"][0], "name" | "count">[];
}): JSX.Element | null {
  const maxBar = values.reduce((acc, value) => {
    const count = value.count;
    return acc > count ? acc : count;
  }, 0);

  return (
    <section>
      <StatHeading>Grade Distribution</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Grade</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Reviews</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {values.map((value) => {
            return (
              <TableRow key={value.name}>
                <TableDataCell align="left">{value.name}</TableDataCell>
                <TableDataCell align="fill">
                  <BarGradient value={value.count} maxValue={maxBar} />
                </TableDataCell>
                <TableDataCell align="right">{value.count}</TableDataCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
}
