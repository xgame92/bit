// @flow
import chalk from 'chalk';
import type { LinksResult } from '../../links/node-modules-linker';

export default (results: LinksResult[]): string => {
  const reportComponents = results
    .map((result) => {
      const bounds = result.bound
        .filter(bound => bound.from && bound.to)
        .map(bound => `\t\tfrom: ${bound.from}, to: ${bound.to}`)
        .join('\n');
      if (!bounds.length) {
        const reason = result.id.scope ? 'is a nested dependency' : 'was not exported yet';
        return chalk.cyan(`\t${result.id.toString()}:\n\t\tnothing to link because the component ${reason}`);
      }
      return chalk.cyan(`\t${result.id.toString()}:\n ${bounds}`);
    })
    .join('\n');

  const reportTitle = chalk.underline(`found ${chalk.bold(results.length.toString())} components\n`);

  return reportTitle + reportComponents;
};
