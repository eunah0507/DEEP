package com.basic.deep.auth.jwt;

import com.basic.deep.auth.exception.ErrorResponse;
import com.basic.deep.auth.util.JwtTokenUtils;
import com.basic.deep.member.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static com.basic.deep.auth.Constants.SECURITY_HTTP_EXCLUDE_URIS;
import static com.basic.deep.auth.util.JwtTokenUtils.REFRESH_PERIOD;


//@Transactional
@RequiredArgsConstructor
public class JsonWebTokenCheckFilter extends OncePerRequestFilter {

    private final AntPathMatcher antPathMatcher;

    private final JsonWebTokenProvider jsonWebTokenProvider;
    private final MemberRepository memberRepository;

//    private String excludeUrl = Constants.BASE_URI + "/**";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //login 요청의 경우 다음 필터로
//        if (antPathMatcher.match("/**", request.getRequestURI())) {
//            filterChain.doFilter(request, response);
//            return;
//        }
        for (String str : SECURITY_HTTP_EXCLUDE_URIS) {
            if (antPathMatcher.match(str, request.getRequestURI())) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        try {
            String access = null;
            for(Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("Refresh")) {
                    access = cookie.getValue();
                }
            }

            if(access == null){
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "잘못된 Refresh 토큰입니다. ");
            }

            if (JwtTokenUtils.isValidToken(access)) { // ACCESS 토큰 유효기간 안지남.
                Authentication authentication = jsonWebTokenProvider.getAuthentication(access); // 정상 토큰이면 SecurityContext 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else { // ACCESS 토큰 유효기간 지남.+ REFRESH 있음

                    throw new ErrorResponse(HttpStatus.BAD_REQUEST, "잘못된 Refresh 토큰입니다. ");

            }

        } catch (ErrorResponse e) {
//            JsonUtils.writeJsonExceptionResponse(response, e.getHttpStatus(), e.getMessage());
            response.sendError(e.getStatusCode(), e.getMessage());
            return;
        }
        doFilter(request, response, filterChain);
    }
}
