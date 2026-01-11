#!/bin/bash

# Convert GIFs to MP4 and WebM for better performance
# Usage: ./scripts/convert-gifs.sh
# Requires: ffmpeg

set -e

MEDIA_DIR="public/media"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Converting GIFs to optimized video formats...${NC}"
echo ""

# Find all GIF files
find "$MEDIA_DIR" -name "*.gif" -type f | while read -r gif; do
    dir=$(dirname "$gif")
    basename=$(basename "$gif" .gif)
    mp4_file="$dir/$basename.mp4"
    webm_file="$dir/$basename.webm"

    echo -e "${YELLOW}Processing: $gif${NC}"

    # Get original size
    original_size=$(ls -lh "$gif" | awk '{print $5}')

    # Convert to MP4 (H.264) - best compatibility
    # -movflags +faststart: Optimizes for web streaming
    # -pix_fmt yuv420p: Ensures compatibility with all players
    # -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2": Ensures even dimensions (required for H.264)
    if [ ! -f "$mp4_file" ]; then
        echo "  Creating MP4..."
        ffmpeg -i "$gif" \
            -movflags +faststart \
            -pix_fmt yuv420p \
            -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
            -c:v libx264 \
            -crf 23 \
            -preset slow \
            -an \
            "$mp4_file" \
            -y -loglevel error
        mp4_size=$(ls -lh "$mp4_file" | awk '{print $5}')
        echo -e "  ${GREEN}MP4 created: $mp4_size${NC}"
    else
        echo -e "  ${YELLOW}MP4 already exists, skipping${NC}"
    fi

    # Convert to WebM (VP9) - better compression, modern browsers
    if [ ! -f "$webm_file" ]; then
        echo "  Creating WebM..."
        ffmpeg -i "$gif" \
            -c:v libvpx-vp9 \
            -crf 30 \
            -b:v 0 \
            -an \
            "$webm_file" \
            -y -loglevel error
        webm_size=$(ls -lh "$webm_file" | awk '{print $5}')
        echo -e "  ${GREEN}WebM created: $webm_size${NC}"
    else
        echo -e "  ${YELLOW}WebM already exists, skipping${NC}"
    fi

    echo -e "  Original GIF: $original_size"
    echo ""
done

echo -e "${GREEN}Done! Video files created alongside GIFs.${NC}"
echo ""
echo "To use in your markdown/components, replace:"
echo '  ![alt](/media/file.gif)'
echo ""
echo "With the Video component:"
echo '  <Video src="/media/file" alt="description" />'
echo ""
echo -e "${YELLOW}Note: You can delete the original GIF files after verifying the videos work correctly.${NC}"
