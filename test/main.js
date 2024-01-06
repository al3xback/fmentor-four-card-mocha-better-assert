import assert from 'better-assert';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-four-card-mocha-better-assert/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;

			const isAnImageExist = (name) => {
				if (!name) {
					return;
				}

				const imageElements =
					document.querySelectorAll('.card__image img');

				let isImageExist = false;

				for (let i = 0; i < imageElements.length; i++) {
					const source = imageElements[i].src;

					if (source.includes(`${name}.svg`)) {
						isImageExist = true;
						break;
					}
				}

				return isImageExist;
			};
			global.isAnImageExist = isAnImageExist;
		} catch (err) {
			console.log(err);
		}
	});

	it("should have a 'supervisor' image with svg extention inside the card element", () => {
		const isImageExist = isAnImageExist('supervisor');
		assert(isImageExist);
	});

	it("should have a 'team-builder' image with svg extention inside the card element", () => {
		const isImageExist = isAnImageExist('team-builder');
		assert(isImageExist);
	});

	it("should have a 'karma' image with svg extention inside the card element", () => {
		const isImageExist = isAnImageExist('karma');
		assert(isImageExist);
	});

	it("should have a 'calculator' image with svg extention inside the card element", () => {
		const isImageExist = isAnImageExist('calculator');
		assert(isImageExist);
	});
});
