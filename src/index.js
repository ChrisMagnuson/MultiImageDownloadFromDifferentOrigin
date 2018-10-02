console.log("hello");

fetch('https://images.tervis.com/is/image/tervis?layer=0&src=is(tervisRender/16oz_final_x2_v1?layer=1&src=ir(tervisRender/16_Warp_trans?&obj=group&decal&src=is(tervisRender/16oz_base2?.BG&layer=5&anchor=0,0&src=is(tervisRender/ugc/prj-9e733f21-ca49-4ba1-8efa-ea07b4b6d63e.tif))&show&res=300&req=object&fmt=png-alpha,rgb))&$order_number=300dpi&fmt=png-alpha,rgb&scl=1&printRes=300').then(res => {
	const fileStream = streamSaver.createWriteStream('DynamicallyStreamedFile.png')
	const writer = fileStream.getWriter()
	// Later you will be able to just simply do
	// res.body.pipeTo(fileStream)

	const reader = res.body.getReader()
	const pump = () => reader.read()
		.then(({ value, done }) => done
			// close the stream so we stop writing
			? writer.close()
			// Write one chunk, then get the next one
			: writer.write(value).then(pump)
		)

	// Start the reader
	pump().then(() =>
		console.log('Closed the stream, Done writing')
	)
})
