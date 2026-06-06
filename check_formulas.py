import json
import re

# We need to extract slugs from tools-registry.ts
with open('src/lib/tools-registry.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Try to find slugs inside the tools array
# Tools are defined as tools: Tool[] = [ { slug: "...", ... } ]
slugs_in_registry = set()
for match in re.finditer(r'slug:\s*"([^"]+)"', content):
    slugs_in_registry.add(match.group(1))

with open('src/lib/formulas-batch.ts', 'r', encoding='utf-8') as f:
    batch_content = f.read()

# Find each generated formula block
# "slug": { slug: "...", inputs: [...], ... }
blocks = re.findall(r'  "([^"]+)": \{.*?\n  \},', batch_content, re.DOTALL)

working_slugs = []
generic_slugs = []
missing_slugs = []

for block in blocks:
    slug = block
    # Get the full block text
    block_text_match = re.search(r'  "' + re.escape(slug) + r'": \{.*?\n  \},', batch_content, re.DOTALL)
    if block_text_match:
        block_text = block_text_match.group(0)
        
        if slug not in slugs_in_registry:
            missing_slugs.append(slug)
        elif '"Value 1"' in block_text:
            generic_slugs.append(slug)
        else:
            working_slugs.append(slug)

print(f"Total blocks: {len(blocks)}")
print(f"Working slugs: {len(working_slugs)}")
print(f"Generic slugs: {len(generic_slugs)}")
print(f"Missing from registry: {len(missing_slugs)}")

print("\nWorking:")
for s in working_slugs:
    print(s)
