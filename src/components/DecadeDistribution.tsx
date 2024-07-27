import { BarGradient } from "./BarGradient";
import { StatHeading } from "./StatHeading";
import {
  Table,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./StatsTable";

interface Value {
  name: string;
  count: number;
}

export function DecadeDistribution({
  values,
}: {
  values: readonly Value[];
}): JSX.Element {
  const maxBar = values.reduce((acc, value) => {
    const count = value.count;
    return acc > count ? acc : count;
  }, 0);

  return (
    <section>
      <StatHeading>By Year Published</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Decade</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Titles</TableHeaderCell>
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
