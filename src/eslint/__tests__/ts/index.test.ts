import { curryExecEslint } from '../util';

describe('TS Lint', () => {
  const execEslint = curryExecEslint('ts');

  test('报错', async () => {
    const { output, error } = await execEslint('error.ts');
    expect(error).toBeTruthy();
    expect(output).toMatchSnapshot();
  });

  test('正常通过', async () => {
    const { output, error } = await execEslint('normal.ts');
    expect(error).toBeFalsy();
    expect(output).toMatchSnapshot();
  });
});
