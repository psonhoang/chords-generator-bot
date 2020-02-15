module.exports = {
	SECRET_TOKEN: 'jwtpass'
}
//curl -X GET "localhost:1337/webhook?hub.verify_token=jwtpass&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"