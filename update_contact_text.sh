#!/bin/bash

# 本講座に関するお問い合わせ文言を一括修正

echo "=== 文言修正開始 ==="
echo ""

# HTMLファイルの修正
find . -name "*.html" -type f | while read file; do
    if grep -q "櫻井までお願いいたします" "$file"; then
        sed -i 's/櫻井までお願いいたします/以下までお願いいたします/g' "$file"
        echo "✅ 修正: $file"
    fi
done

# MDファイルの修正
find . -name "*.md" -type f | while read file; do
    if grep -q "櫻井までお願いいたします" "$file"; then
        sed -i 's/櫻井までお願いいたします/以下までお願いいたします/g' "$file"
        echo "✅ 修正: $file"
    fi
done

echo ""
echo "=== 修正完了 ==="
echo ""
echo "修正確認:"
grep -r "以下までお願いいたします" . --include="*.html" --include="*.md" | wc -l
echo "件の箇所が修正されました"
