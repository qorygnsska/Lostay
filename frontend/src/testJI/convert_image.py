import os
from PIL import Image

def convert_images_to_webp(folder_path):
    # 폴더 내 모든 하위 폴더와 파일을 탐색
    for root, _, files in os.walk(folder_path):
        for filename in files:
            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                input_path = os.path.join(root, filename)
                output_path = os.path.join(root, f"{os.path.splitext(filename)[0]}.webp")

                try:
                    with Image.open(input_path) as img:
                        img.save(output_path, format='WEBP', quality=80)  # 품질을 80으로 설정
                        print(f"Converted {filename} to {os.path.basename(output_path)}")

                    # 원본 파일 삭제
                    os.remove(input_path)
                    print(f"Deleted original file: {filename}")

                except Exception as e:
                    print(f"Error processing {filename}: {e}")

# 사용 예시
folder_path = 'C:/Users/user/Desktop/jejudo/jejudo'  # 변환할 이미지 폴더 경로
convert_images_to_webp(folder_path)