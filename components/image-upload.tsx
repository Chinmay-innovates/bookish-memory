import Image from "next/image";
import { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

import { toast } from "~/hooks/use-toast";
import { config } from "~/lib/config";

const {
	env: {
		imageKit: { publicKey, urlEndpoint },
	},
} = config;

export const ImageUpload = ({
	onFileChange,
}: {
	onFileChange: (filePath: string) => void;
}) => {
	const uploadRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<{ filePath: string } | null>(null);
	const authenticator = async () => {
		try {
			const response = await fetch(
				`${config.env.apiEndpoint}/api/auth/imagekit`
			);

			if (!response.ok) {
				const errorMessage = await response.text();
				throw new Error(
					`Request failed with status ${response.statusText} : ${errorMessage}`
				);
			}

			const data = await response.json();
			const { signature, expire, token } = data;
			return {
				token,
				signature,
				expire,
			};
		} catch (error: any) {
			throw new Error("Authentication request failed: " + error.message);
		}
	};

	const onError = (error: any) => {
		console.log(error);
		toast({
			title: `Image upload failed`,
			description: `Your Image could not be uploaded. Please try again.`,
			variant: "destructive",
		});
	};
	const onSuccess = (res: any) => {
		setFile(res);
		onFileChange(res.filePath);
		toast({
			title: `image uploaded successfully`,
			description: `${res.filePath} uploaded successfully!`,
		});
	};
	return (
		<ImageKitProvider
			publicKey={publicKey}
			urlEndpoint={urlEndpoint}
			authenticator={authenticator}
		>
			<IKUpload
				className="hidden"
				ref={uploadRef}
				onError={onError}
				onSuccess={onSuccess}
				fileName={"test.png"}
			/>
			<button
				className="upload-btn"
				onClick={(e) => {
					e.preventDefault();

					if (uploadRef.current) {
						uploadRef.current.click();
					}
				}}
			>
				<Image
					src="/icons/upload.svg"
					alt="Upload"
					width={20}
					height={20}
					className="object-contain"
				/>
				<p className="text-base text-light-100">
					Upload a file
					{file && <p className="upload-filename">{file.filePath}</p>}
				</p>
			</button>
			{file && (
				<IKImage
					alt={file.filePath}
					path={file.filePath}
					width={500}
					height={300}
				/>
			)}
		</ImageKitProvider>
	);
};
