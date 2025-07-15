import random
import string

codes = set()
while len(codes) < 1000:
    code = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    codes.add(code)

with open('src/unique_codes.csv', 'w') as f:
    f.write('code\n')
    for code in codes:
        f.write(f'{code}\n')