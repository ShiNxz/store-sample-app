const Home = () => {
	return <></>
}

export async function getServerSideProps(context) {
	return {
		redirect: {
			destination: '/home',
			permanent: false,
		},
	}

	return {
		props: {}, // will be passed to the page component as props
	}
}

export default Home
