import fs from 'fs';
import readline from 'readline';

async function extractOriginalFiles() {
  const logPath = 'C:\\Users\\KEERTHAN MS\\.gemini\\antigravity\\brain\\dcb734ab-7593-4274-8a1e-d8dd65b2eb24\\.system_generated\\logs\\transcript.jsonl';
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let foundFormulas = false;
  let foundRegistry = false;

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      
      // Look at view_file outputs or write_to_file calls
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
           if (tc.function.name === 'default_api:write_to_file') {
              const args = tc.function.arguments;
              if (args) {
                 const parsed = JSON.parse(args);
                 if (parsed.TargetFile && parsed.TargetFile.includes('formulas.ts') && !foundFormulas) {
                    console.log("Found early write to formulas.ts");
                    // We might not want the write, we want the view_file BEFORE any writes.
                 }
              }
           }
        }
      }
      
      if (step.type === 'TOOL_CALL_RESPONSE' && step.content) {
        if (step.content.includes('File Path: `file:///d:/Mathcalc/src/lib/formulas.ts`') && !foundFormulas) {
          console.log('Found original formulas.ts view!');
          // Extract file content from the view_file output. 
          // The view_file prepends line numbers: "1: import ..."
          const lines = step.content.split('\n');
          let fileContent = '';
          for (const l of lines) {
             const match = l.match(/^\d+:\s(.*)/);
             if (match) fileContent += match[1] + '\n';
          }
          if (fileContent.length > 0) {
            fs.writeFileSync('formulas_original.ts', fileContent);
            foundFormulas = true;
          }
        }
        
        if (step.content.includes('File Path: `file:///d:/Mathcalc/src/lib/tools-registry.ts`') && !foundRegistry) {
          console.log('Found original tools-registry.ts view!');
          const lines = step.content.split('\n');
          let fileContent = '';
          for (const l of lines) {
             const match = l.match(/^\d+:\s(.*)/);
             if (match) fileContent += match[1] + '\n';
          }
          if (fileContent.length > 0) {
             fs.writeFileSync('tools-registry_original.ts', fileContent);
             foundRegistry = true;
          }
        }
      }
      
      if (foundFormulas && foundRegistry) break;
    } catch (e) {}
  }
}

extractOriginalFiles();
