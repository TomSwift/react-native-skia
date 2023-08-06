#import "DisplayLink.h"

@implementation DisplayLink

- (void)start:(block_t)block {
  self.updateBlock = block;
  // check whether the loop is already running
  if (_displayLink == nil) {
    
    CVDisplayLinkCreateWithActiveCGDisplays(&_displayLink);
    CVDisplayLinkSetOutputHandler(_displayLink, ^CVReturn(CVDisplayLinkRef  _Nonnull displayLink, const CVTimeStamp * _Nonnull inNow, const CVTimeStamp * _Nonnull inOutputTime, CVOptionFlags flagsIn, CVOptionFlags * _Nonnull flagsOut) {
      self.updateBlock(inOutputTime->hostTime);
      return kCVReturnSuccess;
    });
    CVDisplayLinkStart(_displayLink);
  }
}

- (void)stop {
  // check whether the loop is already stopped
  if (_displayLink != nil) {
    CVDisplayLinkStop(_displayLink);
    CVDisplayLinkRelease(_displayLink);
    _displayLink = nil;
  }
}

@end
