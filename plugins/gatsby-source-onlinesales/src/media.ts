import fs from "fs";
import path from "path";

import axios from "axios";

/**
 * Extract media URLs from content
 */
export function extractMediaUrls(content?: string): string[] {
    if (!content) return [];

    const mediaUrls: string[] = [];
    const regex = /\/api\/media\/([^\s"')]+)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        mediaUrls.push(match[1]);
    }

    return mediaUrls;
}

/**
 * Download media files
 */
export async function downloadMedia(
    apiUrl: string,
    filePath: string,
    staticFolder: string
): Promise<string | null> {
    try {
        const mediaUrl = `${apiUrl}/api/media/${filePath}`;
        const response = await axios.get(mediaUrl, { responseType: "arraybuffer" });

        const localPath = path.join(staticFolder, "media", filePath);
        const localDir = path.dirname(localPath);

        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, { recursive: true });
        }

        fs.writeFileSync(localPath, response.data);

        return `/media/${filePath}`;
    } catch (error) {
        console.error(`Error downloading media from ${filePath}:`, error);
        return null;
    }
}

/**
 * Replace media URLs in content
 */
export function replaceMediaUrls(
    content: string | undefined,
    localMediaPaths: Record<string, string>
): string {
    if (!content) return "";

    let updatedContent = content;

    for (const [mediaPath, localUrl] of Object.entries(localMediaPaths)) {
        const regex = new RegExp(`/api/media/${mediaPath}`, "g");
        updatedContent = updatedContent.replace(regex, localUrl);
    }

    return updatedContent;
}
