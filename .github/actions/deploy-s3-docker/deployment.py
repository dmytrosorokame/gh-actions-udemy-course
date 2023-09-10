import os
import boto3
from botocore.config import Config

def run():
  bucket = os.environ['INPUT_BUCKET']
  bucket_region = os.environ['INPUT_BUCKET-REGION']
  source_dir = os.environ['INPUT_SOURCE-DIR']

  config = Config(region_name=bucket_region)

  s3_client = boto3.client('s3', config=config)

  for root, dirs, files in os.walk(source_dir):
    for file in files:
      s3_client.upload_file(os.path.join(root, file), bucket, file)
    
  website_url = f'http://{bucket}.s3-website.{bucket_region}.amazonaws.com'
  print(f'::set-output name=website-url::{website_url}')

if __name__ == '__main__':
  run()