import React from 'react';

function Test() {
	return (
		<div>
			<article data-v-72ef202a='' id='user-info' className='box_form'>
				<div data-v-72ef202a='' className='heading'>
					<h3 data-v-72ef202a=''>예약자 정보</h3>{' '}
					<span data-v-72ef202a='' className='option'>
						<span data-v-72ef202a='' className='txt_required'>
							<span data-v-72ef202a='' className='ico_required'>
								*
							</span>
							필수입력
						</span>
					</span>
				</div>{' '}
				<div data-v-72ef202a='' className='reserve_person_wrap'>
					<dl data-v-72ef202a='' className='flex_box'>
						<dt data-v-72ef202a='' className='flex tit'>
							<label data-v-72ef202a='' htmlFor='name'>
								예약자
							</label>{' '}
							<span data-v-72ef202a='' className='ico_required'>
								*
							</span>
						</dt>{' '}
						<dd data-v-72ef202a='' className='flex'>
							<div data-v-72ef202a='' className='input'>
								<input
									data-v-72ef202a=''
									id='name'
									type='text'
								/>
							</div>
						</dd>
					</dl>{' '}
					<dl data-v-72ef202a='' className='flex_box'>
						<dt data-v-72ef202a='' className='flex tit'>
							<label data-v-72ef202a='' htmlFor='phone1'>
								연락처
							</label>{' '}
							<span data-v-72ef202a='' className='ico_required'>
								*
							</span>
						</dt>{' '}
						<dd data-v-72ef202a='' className='flex mobile'>
							<div data-v-72ef202a='' className='row'>
								<div data-v-72ef202a='' className='col4'>
									<div
										data-v-72ef202a=''
										className='select'
									></div>
								</div>{' '}
								<div data-v-72ef202a='' className='col4'>
									<input
										data-v-72ef202a=''
										id='phone2'
										type='tel'
										title='휴대폰 중간자리'
										required='required'
										maxLength={4}
										onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"
									/>
								</div>{' '}
								<div data-v-72ef202a='' className='col4'>
									<input
										data-v-72ef202a=''
										id='phone3'
										type='tel'
										title='휴대폰 뒷자리'
										required='required'
										maxLength={4}
										onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"
									/>
								</div>
							</div>
						</dd>
					</dl>{' '}
					<dl data-v-72ef202a='' className='flex_box'>
						<dt data-v-72ef202a='' className='flex tit'>
							<label data-v-72ef202a='' htmlFor='email'>
								이메일
							</label>{' '}
							<span data-v-72ef202a='' className='ico_required'>
								*
							</span>
						</dt>{' '}
						<dd data-v-72ef202a='' className='flex'>
							<div data-v-72ef202a='' className='input'>
								<input
									data-v-72ef202a=''
									id='email'
									type='email'
									placeholder='이메일 주소를 입력해 주세요.'
								/>
							</div>
						</dd>
					</dl>{' '}
					<dl data-v-72ef202a='' className='flex_box'>
						<dt data-v-72ef202a='' className='flex tit'>
							<label
								data-v-72ef202a=''
								htmlFor='reservationPurpose'
							>
								사용목적
							</label>
						</dt>{' '}
						<dd data-v-72ef202a='' className='flex'>
							<div data-v-72ef202a='' className='input'>
								<input
									data-v-72ef202a=''
									id='reservationPurpose'
									type='text'
									placeholder='촬영, 파티, 모임, 수업 등 공간의 사용 목적을 입력해주세요.'
								/>
							</div>
						</dd>
					</dl>{' '}
					<dl data-v-72ef202a='' className='flex_box'>
						<dt data-v-72ef202a='' className='flex tit'>
							<label data-v-72ef202a='' htmlFor='request'>
								요청사항
							</label>
						</dt>{' '}
						<dd data-v-72ef202a='' className='flex'>
							<div data-v-72ef202a='' className='input'>
								<textarea
									data-v-72ef202a=''
									id='request'
									name=''
									placeholder='남기고 싶은말을 적어주세요. (최대 500자)'
									maxLength={500}
									defaultValue={''}
								/>
							</div>
						</dd>
					</dl>
				</div>{' '}
				<p data-v-72ef202a='' className='p_guide normal'>
					<i data-v-72ef202a='' className='sp_icon ico_alert' />
					예약자 정보로 알림톡과 이메일이 발송됩니다. 정확한 정보인지
					확인해주세요.
				</p>
			</article>
		</div>
	);
}

export default Test;
