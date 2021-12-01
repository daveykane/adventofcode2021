export const getInput = async (day: string, file = "input"): Promise<string> => {
  const text = await Deno.readTextFile(`${Deno.cwd()}/src/${day}/${file}.txt`);
  return text.trim();
}