#!/usr/bin/env python3
import json, os, urllib.request
from instagrapi import Client

OUT_JSON    = "public/ig-posts.json"
OUT_IMG_DIR = "public/images/ig-posts"
COUNT       = 12

os.makedirs(OUT_IMG_DIR, exist_ok=True)

cl = Client()
cl.login_by_sessionid(os.environ["INSTAGRAM_SESSIONID"])

uid    = cl.user_id_from_username(os.environ["INSTAGRAM_USERNAME"])
medias = cl.user_medias(uid, COUNT)

posts = []
for i, m in enumerate(medias):
    thumb = m.thumbnail_url or (
        m.image_versions2.candidates[0].url if m.image_versions2 and m.image_versions2.candidates else None
    )
    if not thumb:
        continue
    dest = f"{OUT_IMG_DIR}/post-{i + 1}.jpg"
    urllib.request.urlretrieve(str(thumb), dest)
    posts.append({
        "imageFile": f"images/ig-posts/post-{i + 1}.jpg",
        "postUrl":   f"https://www.instagram.com/p/{m.code}/",
    })

with open(OUT_JSON, "w") as f:
    json.dump(posts, f)

print(f"Saved {len(posts)} posts → {OUT_JSON}")
