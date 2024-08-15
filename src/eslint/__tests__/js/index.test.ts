import { curryExecEslint } from '../util';

describe('JS Lint', () => {
  const execEslint = curryExecEslint('js');

  test('报错', async () => {
    const { output, error } = await execEslint('error.cjs');
    expect(error).toBeTruthy();
    expect(output).toMatchSnapshot();
  });

  test('正常通过', async () => {
    const { output, error } = await execEslint('normal.cjs');
    expect(error).toBeFalsy();
    expect(output).toMatchSnapshot();
  });
});
