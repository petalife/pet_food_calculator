import boto3
import random
import string
import json

# Initialize DynamoDB client
# Set region_name to 'us-east-2' (Ohio)
dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
table = dynamodb.Table('pet_food_calculator')  # Replace 'YOUR_TABLE_NAME' with your actual table name

def generate_unique_codes(count=1000):
    """Generate unique 8-character alphanumeric codes"""
    codes = set()
    while len(codes) < count:
        # Generate 8-character code with uppercase letters and numbers
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        codes.add(code)
    return list(codes)

def upload_codes_to_dynamodb(codes):
    """Upload codes to DynamoDB in batches"""
    print(f"Uploading {len(codes)} codes to DynamoDB...")
    
    # DynamoDB batch write can handle up to 25 items per request
    batch_size = 25
    uploaded_count = 0
    
    with table.batch_writer() as batch:
        for i in range(0, len(codes), batch_size):
            batch_codes = codes[i:i + batch_size]
            
            for code in batch_codes:
                batch.put_item(Item={'code': code})
                uploaded_count += 1
            
            print(f"Uploaded batch {i//batch_size + 1}: {uploaded_count}/{len(codes)} codes")
    
    print(f"Successfully uploaded {uploaded_count} codes to DynamoDB!")

def save_codes_to_file(codes, filename='generated_codes.json'):
    """Save codes to a JSON file for backup"""
    with open(filename, 'w') as f:
        json.dump(codes, f, indent=2)
    print(f"Codes saved to {filename}")

def main():
    print("Generating 1000 unique codes...")
    codes = generate_unique_codes(1000)
    
    # Save codes to file for backup
    save_codes_to_file(codes)
    
    # Upload to DynamoDB
    upload_codes_to_dynamodb(codes)
    
    print("Done!")

if __name__ == "__main__":
    main() 