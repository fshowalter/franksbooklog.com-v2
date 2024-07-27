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

export function EditionDistribution({
  values,
}: {
  values: readonly Value[];
}): JSX.Element | null {
  const maxBar = values.reduce((acc, value) => {
    const count = value.count;
    return acc > count ? acc : count;
  }, 0);

  return (
    <section>
      <StatHeading>By Edition</StatHeading>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell align="left">Edition</TableHeaderCell>
            <th>&nbsp;</th>
            <TableHeaderCell align="right">Titles</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {values.map((value) => {
            return (
              <TableRow key={value.name}>
                <TableDataCell align="left">{value.name}</TableDataCell>
                <TableDataCell hideOnSmallScreens align="fill">
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
