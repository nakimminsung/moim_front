import React from 'react';

function NoticeUpdate(props) {
	return (
		<div>
			{/* Dialogue Modal 화면 : 공지사항 수정 Update 폼 */}
			<div>
				<form onSubmit={submitHandler}>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>공지사항 등록</DialogTitle>
						<DialogContent>
							<DialogContentText style={{width: '600px'}}>
								'유형'을 선택한 후 제목과 내용을 작성해주시기
								바랍니다.
								<br /> 작성이 완료되면 '완료' 버튼을 눌러
								게시글을 등록할 수 있습니다.
							</DialogContentText>

							<FormControl
								className={classes.formControl}
								style={{marginLeft: '-0px'}}
							>
								<InputLabel htmlFor='age-native-simple'>
									유형 선택
								</InputLabel>
								<Select
									native
									onChange={noticeTypeHandler}
									value={noticeType}
								>
									<option aria-label='None' value='' />
									<option value={'이벤트'}>이벤트</option>
									<option value={'공지사항'}>공지사항</option>
								</Select>
							</FormControl>

							<TextField
								// autoFocus
								margin='dense'
								id='title'
								label='제목을 입력해주세요'
								type='text'
								fullWidth
								variant='standard'
								onChange={noticeTitleHandler}
								value={noticeTitle}
							/>
							<br />
							<br />
							<textarea
								className='form-control'
								placeholder='내용을 입력해주시기 바랍니다.'
								style={{height: '300px'}}
								onChange={noticeContentHandler}
								value={noticeContent}
							/>
							<br />
							<input
								type={'file'}
								className='form-control'
								onChange={uploadFileHandler}
							/>
						</DialogContent>
						<DialogActions style={{marginRight: '15px'}}>
							<button
								type='button'
								className='btn btn-outline-secondary'
								onClick={handleClose}
							>
								취소
							</button>
							&nbsp;&nbsp;
							<button
								type='submit'
								className='btn btn-dark'
								onClick={submitHandler}
							>
								저장
							</button>
							{/* 
						<Button onClick={handleClose}>취소</Button>
						<Button onClick={handleSubmit}>저장</Button>
						 */}
						</DialogActions>
					</Dialog>
				</form>
			</div>
		</div>
	);
}

export default NoticeUpdate;
