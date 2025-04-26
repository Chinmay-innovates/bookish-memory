import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import { config } from "~/lib/config";

const {
	env: {
		imageKit: { privateKey, publicKey, urlEndpoint },
	},
} = config;

const imageKit = new ImageKit({
	publicKey,
	privateKey,
	urlEndpoint,
});

export async function GET() {
	return NextResponse.json(imageKit.getAuthenticationParameters());
}
