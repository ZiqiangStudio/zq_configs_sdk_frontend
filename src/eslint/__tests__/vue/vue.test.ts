import { exec, ExecException } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const isError = (e: unknown): e is Error => {
  return (
    typeof e === 'object' &&
    !!e &&
    'name' in e &&
    typeof e.name === 'string' &&
    'message' in e &&
    typeof e.message === 'string'
  );
};

const isExecException = (e: unknown): e is ExecException => {
  return isError(e) && 'cmd' in e && typeof e.cmd === 'string';
};

const execEslint = async ({ file }: { file: string }) => {
  const promiseExec = promisify(exec);
  const dirName = dirname(fileURLToPath(import.meta.url));
  try {
    const { stdout } = await promiseExec(
      `npx eslint -c ${dirName}/eslint.config.js ${dirName}/${file}`,
    );
    return stdout;
  } catch (e) {
    if (isExecException(e)) {
      return e.stdout ?? '';
    }
    return '';
  }
};

describe('Vue Lint', () => {
  test('Vue Lint 报错', async () => {
    const eslintOutput = await execEslint({ file: 'vue.vue' });
    expect(eslintOutput).toMatchSnapshot();
  });
});
