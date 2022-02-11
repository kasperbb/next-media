/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */
function serialize(name: string, val: string, options: any): string {
	const opt = options || {}
	const enc = encodeURIComponent
	const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/

	if (typeof enc !== 'function') {
		throw new TypeError('option encode is invalid')
	}

	if (!fieldContentRegExp.test(name)) {
		throw new TypeError('argument name is invalid')
	}

	const value = enc(val)

	if (value && !fieldContentRegExp.test(value)) {
		throw new TypeError('argument val is invalid')
	}

	let str = name + '=' + value

	if (null != opt.maxAge) {
		const maxAge = opt.maxAge - 0

		if (isNaN(maxAge) || !isFinite(maxAge)) {
			throw new TypeError('option maxAge is invalid')
		}

		str += '; Max-Age=' + Math.floor(maxAge)
	}

	if (opt.domain) {
		if (!fieldContentRegExp.test(opt.domain)) {
			throw new TypeError('option domain is invalid')
		}

		str += '; Domain=' + opt.domain
	}

	if (opt.path) {
		if (!fieldContentRegExp.test(opt.path)) {
			throw new TypeError('option path is invalid')
		}

		str += '; Path=' + opt.path
	}

	if (opt.expires) {
		if (typeof opt.expires.toUTCString !== 'function') {
			throw new TypeError('option expires is invalid')
		}

		str += '; Expires=' + opt.expires.toUTCString()
	}

	if (opt.httpOnly) {
		str += '; HttpOnly'
	}

	if (opt.secure) {
		str += '; Secure'
	}

	if (opt.sameSite) {
		const sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite

		switch (sameSite) {
			case true:
				str += '; SameSite=Strict'
				break
			case 'lax':
				str += '; SameSite=Lax'
				break
			case 'strict':
				str += '; SameSite=Strict'
				break
			case 'none':
				str += '; SameSite=None'
				break
			default:
				throw new TypeError('option sameSite is invalid')
		}
	}

	return str
}

/**
 * Based on the environment and the request we know if a secure cookie can be set.
 */
function isSecureEnvironment(req: any) {
	if (!req || !req.headers || !req.headers.host) {
		throw new Error('The "host" request header is not available')
	}

	const host = (req.headers.host.indexOf(':') > -1 && req.headers.host.split(':')[0]) || req.headers.host
	if (['localhost', '127.0.0.1'].indexOf(host) > -1) {
		return false
	}

	return true
}

/**
 * Serialize a cookie to a string.
 * @param cookie The cookie to serialize
 * @param secure Create a secure cookie.
 */
function serializeCookie(
	cookie: {
		[key: string]: string
	} & { maxAge: number },
	secure: any
) {
	return serialize(cookie.name, cookie.value, {
		maxAge: cookie.maxAge,
		expires: new Date(Date.now() + cookie.maxAge * 1000),
		httpOnly: true,
		secure,
		path: cookie.path ?? '/',
		domain: cookie.domain ?? '',
		sameSite: cookie.sameSite ?? 'lax',
	})
}

/**
 * Set one or more cookies.
 * @param res The HTTP response on which the cookie will be set.
 * @returns {void}
 */
export function setCookies(req: any, res: any, cookies: any[]) {
	const strCookies = cookies.map(c => serializeCookie(c, isSecureEnvironment(req)))
	const previousCookies = res.getHeader('Set-Cookie')
	if (previousCookies) {
		if (previousCookies instanceof Array) {
			Array.prototype.push.apply(strCookies, previousCookies)
		} else if (typeof previousCookies === 'string') {
			strCookies.push(previousCookies)
		}
	}
	res.setHeader('Set-Cookie', strCookies)
}

/**
 * Set one or more cookies.
 * @param res The HTTP response on which the cookie will be set.
 * @returns {void}
 */
export function setCookie(req: any, res: any, cookie: any) {
	setCookies(req, res, [cookie])
}

export function deleteCookie(req: any, res: any, name: string) {
	setCookie(req, res, {
		name,
		value: '',
		maxAge: -1,
	})
}
