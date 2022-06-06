import { glob } from 'glob';
import { InputOptions, OutputChunk, OutputOptions, rollup } from 'rollup';
import tsPlugin from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';

type RollupOptions = InputOptions & { output?: OutputOptions };
type ConfigOptions = Omit<RollupOptions, 'input' | 'output'> &
  Required<Pick<RollupOptions, 'input' | 'output'>>;

const bundlePackage = async (
  options: ConfigOptions & { output: OutputOptions }
): Promise<OutputChunk[]> => {
  const defaultOptions: RollupOptions = {
    plugins: [
      tsPlugin({
        typescript: ttypescript,
        tsconfigOverride: {
          compilerOptions: {
            module: 'esnext',
          },
        },
      }),
    ],
    cache: false,
  };
  const configOptions: ConfigOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    const bundle = await rollup(configOptions);
    const { output } = await bundle.write(configOptions.output);
    return output.filter(item => item.type === 'chunk') as OutputChunk[];
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    return [];
  }
};

const componentsConfig: ConfigOptions = {
  input: glob.sync('src/index.ts'),
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: false,
    exports: 'auto',
  },
  maxParallelFileReads: 200,
};
const iconConfig: ConfigOptions = {
  input: glob.sync('src/icons/*.tsx'),
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: false,
    exports: 'auto',
  },
  maxParallelFileReads: 200,
};
const configs: ConfigOptions[] = [componentsConfig, iconConfig];

configs.map(bundlePackage);
