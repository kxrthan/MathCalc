import fs from 'fs';
import { Project, SyntaxKind } from 'ts-morph';

const ORIGINAL_SLUGS = new Set([
  'cm-to-inches', 'inches-to-cm', 'lbs-to-kg', 'kg-to-lbs',
  'area-of-circle', 'area-of-rectangle', 'pythagorean-theorem',
  'velocity', 'kinetic-energy', 'miles-to-km', 'km-to-miles',
  'gallons-to-liters', 'liters-to-gallons', 'grams-to-ounces',
  'ounces-to-grams', 'area-of-triangle', 'area-of-square',
  'volume-of-cube', 'volume-of-sphere', 'volume-of-cylinder',
  'ohms-law-calculator', 'speed-calculator', 'density-calculator',
  'simple-interest-calculator', 'markup-calculator'
]);

const project = new Project();

// 1. Rollback formulas.ts
console.log("Rolling back formulas.ts...");
const formulasFile = project.addSourceFileAtPath('src/lib/formulas.ts');
const formulasDecl = formulasFile.getVariableDeclaration('formulas');
const formulasInit = formulasDecl?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
let deletedFormulas = 0;

if (formulasInit) {
  const properties = formulasInit.getProperties();
  for (let i = properties.length - 1; i >= 0; i--) {
    const property = properties[i];
    if (property.isKind(SyntaxKind.PropertyAssignment)) {
      const slug = property.getName().replace(/['"]/g, '');
      if (!ORIGINAL_SLUGS.has(slug)) {
        property.remove();
        deletedFormulas++;
      }
    }
  }
}
formulasFile.saveSync();
console.log(`Purged ${deletedFormulas} injected formulas.`);

// 2. Rollback tools-registry.ts (UI)
console.log("Rolling back tools-registry.ts...");
const registryFile = project.addSourceFileAtPath('src/lib/tools-registry.ts');
const toolsDecl = registryFile.getVariableDeclaration('tools');
const toolsArr = toolsDecl?.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
let deletedUiTools = 0;

if (toolsArr) {
  const elements = toolsArr.getElements();
  for (let i = elements.length - 1; i >= 0; i--) {
    const toolObj = elements[i];
    if (toolObj.isKind(SyntaxKind.ObjectLiteralExpression)) {
      const slugProp = toolObj.getProperty('slug');
      if (slugProp && slugProp.isKind(SyntaxKind.PropertyAssignment)) {
        const slugStr = slugProp.getInitializerIfKind(SyntaxKind.StringLiteral);
        if (slugStr) {
          const slug = slugStr.getLiteralValue();
          if (!ORIGINAL_SLUGS.has(slug)) {
            toolsArr.removeElement(i);
            deletedUiTools++;
          }
        }
      }
    }
  }
}
registryFile.saveSync();
console.log(`Purged ${deletedUiTools} injected UI tools.`);

// 3. Delete temporary files
const filesToDelete = [
  'conversions.ts', // If it exists in root or src/lib
  'src/lib/conversions.ts',
  'formulas-types.ts',
  'src/lib/formulas-types.ts',
  'test_all_tools.ts',
  'cleanup_registry_v2.ts',
  'cleanup_registry.ts',
  'delete_complex_tools.ts',
  'test_csrf.ts',
  'apply_all_formulas.ts',
  'apply_scraped_logic.ts',
  'inject_fields.ts',
  'inject_select_options.ts',
  'refactor_conversions.ts',
  'test_complex_tools.ts',
  'test_custom_inputs.ts',
  'quick_clean.ts',
  'complex_tools.json',
  'scraped_formulas.json',
  'select_options.json'
];

let deletedScripts = 0;
for (const file of filesToDelete) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    deletedScripts++;
  }
}
console.log(`Deleted ${deletedScripts} temporary generated scripts and data files.`);

console.log("Rollback complete! Project restored to original state.");
